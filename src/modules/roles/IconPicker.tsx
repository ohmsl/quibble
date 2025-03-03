import {
    Box,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Tooltip,
} from "@mui/material";
import Fuse from "fuse.js";
import { SearchIcon, XIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { AutoSizer, List } from "react-virtualized";
import { roleIconMap } from "./roleIcons";

const ICON_SIZE = 48;

type Props = {
    icons: Array<{ name: string; Icon: React.FC }>;
    onChange: (icon: keyof typeof roleIconMap) => void;
    value?: keyof typeof roleIconMap;
};

export const IconPicker = ({ icons, onChange, value }: Props) => {
    const fuse = useMemo(
        () =>
            new Fuse(icons, {
                keys: ["name"],
                threshold: 0.3,
                distance: 100,
            }),
        [icons],
    );

    const [searchTerm, setSearchTerm] = useState("");

    const filteredIcons = useMemo(() => {
        if (!searchTerm) return icons;
        return fuse.search(searchTerm).map((result) => result.item);
    }, [searchTerm]);

    return (
        <Stack flex={1} minHeight={200}>
            <TextField
                placeholder="Search icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 1 }}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                {searchTerm.length > 0 ? (
                                    <IconButton
                                        onClick={() => setSearchTerm("")}
                                        size="small"
                                    >
                                        <XIcon size={20} />
                                    </IconButton>
                                ) : (
                                    <SearchIcon size={20} />
                                )}
                            </InputAdornment>
                        ),
                    },
                }}
                size="small"
                fullWidth
            />

            <Box flex={1}>
                <AutoSizer>
                    {({ width, height }) => {
                        // Calculate how many icons fit per row
                        const iconsPerRow = Math.max(
                            1,
                            Math.floor(width / ICON_SIZE),
                        );

                        // Calculate rows needed
                        const rowCount = Math.ceil(
                            filteredIcons.length / iconsPerRow,
                        );

                        const rowRenderer = ({
                            index,
                            key,
                            style,
                        }: {
                            index: number;
                            key: string;
                            style: React.CSSProperties;
                        }) => {
                            const startIndex = index * iconsPerRow;
                            const endIndex = Math.min(
                                startIndex + iconsPerRow,
                                filteredIcons.length,
                            );
                            const rowIcons = filteredIcons.slice(
                                startIndex,
                                endIndex,
                            );

                            // Calculate space distribution for this row
                            // If the row is full, we use the standard size
                            // If the row isn't full, we adjust spacing to maintain the layout
                            const actualIconsInRow = rowIcons.length;

                            return (
                                <div
                                    key={key}
                                    style={{
                                        ...style,
                                        display: "flex",
                                        justifyContent:
                                            actualIconsInRow < iconsPerRow
                                                ? "flex-start"
                                                : "space-around",
                                    }}
                                >
                                    {rowIcons.map(({ name, Icon }, i) => (
                                        <Box
                                            key={i}
                                            sx={{
                                                width:
                                                    actualIconsInRow <
                                                    iconsPerRow
                                                        ? ICON_SIZE
                                                        : width / iconsPerRow,
                                                display: "flex",
                                                justifyContent: "center",
                                                color: "text.primary",
                                            }}
                                        >
                                            <Tooltip
                                                title={name
                                                    .replace(/([A-Z])/g, " $1")
                                                    .trim()}
                                            >
                                                <IconButton
                                                    color={
                                                        value === name
                                                            ? "primary"
                                                            : "inherit"
                                                    }
                                                    onClick={() => {
                                                        onChange(name);
                                                    }}
                                                >
                                                    <Icon size={32} />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    ))}
                                </div>
                            );
                        };

                        return (
                            <List
                                rowRenderer={rowRenderer}
                                rowCount={rowCount}
                                rowHeight={ICON_SIZE}
                                height={height}
                                width={width}
                                overscanRowCount={5}
                            />
                        );
                    }}
                </AutoSizer>
            </Box>
        </Stack>
    );
};
