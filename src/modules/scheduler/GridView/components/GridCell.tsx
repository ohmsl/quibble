import { useDroppable } from "@dnd-kit/core";
import { Box, TableCell, Typography, alpha, useTheme } from "@mui/material";
import { memo } from "react";
import { DraggableMember } from "./DraggableMember";

/** Single matrix cell showing a member (or placeholder) and acting as droppable. */
export interface GridCellProps {
    /** `${eventId}-${roleId}` */
    cellId: string;
    memberName?: string;
}

export const GridCell: React.FC<GridCellProps> = memo(
    ({ cellId, memberName }) => {
        const theme = useTheme();
        const { setNodeRef, isOver } = useDroppable({ id: cellId });

        return (
            <TableCell
                ref={setNodeRef}
                sx={{
                    p: 0,
                    borderRadius: 1,
                    height: 56, // ensure full‑height hit area even when empty
                    outline: isOver
                        ? `1px solid ${theme.palette.primary.main}`
                        : "none",
                    backgroundColor: isOver
                        ? alpha(theme.palette.primary.light, 0.15)
                        : "transparent",
                    "&:hover": {
                        outline: `1px solid ${theme.palette.primary.main}`,
                        backgroundColor: alpha(
                            theme.palette.primary.light,
                            0.1,
                        ),
                        cursor: "pointer",
                    },
                }}
            >
                <Box
                    sx={{
                        px: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {memberName ? (
                        <DraggableMember cellId={cellId} name={memberName} />
                    ) : (
                        <Typography sx={{ opacity: 0.5 }}>–</Typography>
                    )}
                </Box>
            </TableCell>
        );
    },
);
