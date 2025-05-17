import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
} from "@dnd-kit/core";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    alpha,
} from "@mui/material";
import {
    addMonths,
    endOfMonth,
    format,
    startOfMonth,
    subMonths,
} from "date-fns";
import { useCallback, useMemo, useState } from "react";
import { MembersRecord } from "../../../types/pb_types";
import { createSelectEventsForRange } from "../../state/events/selectors/createSelectEventsForRange";
import { useAppState } from "../../state/useAppState";
import { DateRangeBar } from "../DateRangeBar";
import { GridCell } from "./components/GridCell";

export interface Assignment {
    id: string;
    event_id: string;
    role_id: string;
    member_id: string;
}

const members: Array<Partial<MembersRecord>> = [
    { id: "m1", name: "Alice" },
    { id: "m2", name: "Bob" },
    { id: "m3", name: "Charlie" },
    { id: "m4", name: "Dora" },
];

const initialAssignments: readonly Assignment[] = [
    {
        id: "a1",
        event_id: "bcryypm7mcm38ak",
        role_id: "h1mbrvx0c4pbnao",
        member_id: "m2",
    },
    {
        id: "a3",
        event_id: "401td4u9zt34se6",
        role_id: "h1mbrvx0c4pbnao",
        member_id: "m3",
    },
];

export const GridView: React.FC = () => {
    const [rangeStart, setRangeStart] = useState(startOfMonth(new Date()));
    const [rangeEnd, setRangeEnd] = useState(endOfMonth(new Date()));
    const [assignments, setAssignments] = useState<Assignment[]>([
        ...initialAssignments,
    ]);
    const [activeDrag, setActiveDrag] = useState<{
        cellId: string;
        memberName: string;
    } | null>(null);

    // Navigate date range ----------------------------------------------------------
    const handlePrevious = () => {
        setRangeStart((prev) => startOfMonth(subMonths(prev, 1)));
        setRangeEnd((prev) => endOfMonth(subMonths(prev, 1)));
    };

    const handleNext = () => {
        setRangeStart((prev) => startOfMonth(addMonths(prev, 1)));
        setRangeEnd((prev) => endOfMonth(addMonths(prev, 1)));
    };

    // Select roles + events from global state ---------------------------------------
    const roles = useAppState.use.roles();
    const events = useAppState(
        createSelectEventsForRange(rangeStart, rangeEnd),
    );

    // Map `${eventId}-${roleId}` → assignment --------------------------------------
    const lookup = useMemo(() => {
        const map = new Map<string, Assignment>();
        assignments.forEach((a) => map.set(`${a.event_id}-${a.role_id}`, a));
        return map;
    }, [assignments]);

    const memberNameFromId = (mid: string | undefined): string | undefined =>
        members.find((m) => m.id === mid)?.name;

    // DnD handlers ------------------------------------------------------------------
    const handleDragStart = useCallback((e: DragStartEvent) => {
        const data = e.active.data.current as
            | { cellId: string; memberName: string }
            | undefined;
        if (data) setActiveDrag(data);
    }, []);

    const handleDragEnd = useCallback((e: DragEndEvent) => {
        const { active, over } = e;
        setActiveDrag(null);
        if (!over || !active.data.current) return;
        const sourceCell = (active.data.current as { cellId: string }).cellId;
        const targetCell = over.id as string;
        if (sourceCell === targetCell) return;

        setAssignments((prev) => {
            const draft = [...prev];
            const [se, sr] = sourceCell.split("-");
            const [te, tr] = targetCell.split("-");

            const si = draft.findIndex(
                (a) => a.event_id === se && a.role_id === sr,
            );
            const ti = draft.findIndex(
                (a) => a.event_id === te && a.role_id === tr,
            );
            const sa = si !== -1 ? draft[si] : undefined;
            const ta = ti !== -1 ? draft[ti] : undefined;

            if (!sa && !ta) return prev;
            if (sa && !ta) {
                draft[si] = { ...sa, event_id: te, role_id: tr };
                return draft;
            }
            if (!sa && ta) {
                draft[ti] = { ...ta, event_id: se, role_id: sr };
                return draft;
            }
            if (sa && ta) {
                const tmp = sa.member_id;
                draft[si] = { ...sa, member_id: ta.member_id };
                draft[ti] = { ...ta, member_id: tmp };
                return draft;
            }
            return prev;
        });
    }, []);

    // ----------------------------------------------------------------------------
    return (
        <Paper variant="outlined">
            <DateRangeBar
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
            />
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <DragOverlay>
                    {activeDrag && (
                        <Box
                            sx={(t) => ({
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                bgcolor: alpha(
                                    t.palette.background.paper,
                                    0.95,
                                ),
                                boxShadow: 3,
                                pointerEvents: "none",
                            })}
                        >
                            <Typography>{activeDrag.memberName}</Typography>
                        </Box>
                    )}
                </DragOverlay>
                <Box sx={{ overflowX: "auto" }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography>Date</Typography>
                                </TableCell>
                                {roles.map((r) => (
                                    <TableCell
                                        key={r.id}
                                        sx={{ bgcolor: "background.paper" }}
                                    >
                                        <Typography noWrap>{r.name}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.map((ev) => (
                                <TableRow key={ev.id}>
                                    <TableCell>
                                        <Typography>
                                            {format(ev.date, "EEEE do")}
                                        </Typography>
                                    </TableCell>
                                    {roles.map((rl) => {
                                        const cid = `${ev.id}-${rl.id}`;
                                        const assn = lookup.get(cid);
                                        return (
                                            <GridCell
                                                key={cid}
                                                cellId={cid}
                                                memberName={memberNameFromId(
                                                    assn?.member_id,
                                                )}
                                            />
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </DndContext>
        </Paper>
    );
};
