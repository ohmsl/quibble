import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Typography } from "@mui/material";
import { memo } from "react";

/**
 * Draggable wrapper for a member label in the assignment grid.
 */
export interface DraggableMemberProps {
    /** Cell from which the drag originates, `${eventId}-${roleId}` */
    cellId: string;
    /** Member display name */
    name: string;
}

export const DraggableMember: React.FC<DraggableMemberProps> = memo(
    ({ cellId, name }) => {
        const { attributes, listeners, setNodeRef, transform, isDragging } =
            useDraggable({
                id: `drag-${cellId}`,
                data: { cellId, memberName: name },
            });

        const style: React.CSSProperties = {
            transform: transform
                ? CSS.Translate.toString(transform)
                : undefined,
            opacity: isDragging ? 0.4 : 1,
            cursor: "grab",
            userSelect: "none",
            whiteSpace: "nowrap",
        };

        return (
            <Typography
                ref={setNodeRef}
                {...listeners}
                {...attributes}
                sx={style}
            >
                {name}
            </Typography>
        );
    },
);
