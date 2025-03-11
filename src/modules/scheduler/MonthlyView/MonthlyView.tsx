import {
	Box,
	Button,
	ButtonBase,
	Divider,
	Grid2 as Grid,
	IconButton,
	Paper,
	Stack,
	Typography,
	alpha,
} from "@mui/material";
import {
	addDays,
	addMonths,
	eachDayOfInterval,
	endOfMonth,
	format,
	isSameDay,
	isSameMonth,
	startOfMonth,
	subMonths,
} from "date-fns";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { createSelectEventsForRange } from "../../state/events/selectors/createSelectEventsForRange";
import { useAppState } from "../../state/useAppState";
import { CalendarDay } from "./CalendarDay";

const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

export const MonthlyView = () => {
	const [rangeStart, setRangeStart] = useState(startOfMonth(new Date()));
	const [rangeEnd, setRangeEnd] = useState(endOfMonth(new Date()));

	const monthDays = eachDayOfInterval({
		start: rangeStart,
		end: rangeEnd,
	});

	const paddingDaysBefore = useMemo(() => {
		const startDay = rangeStart.getDay();
		const mondayBasedStartDay = startDay === 0 ? 6 : startDay - 1;
		return Array.from({ length: mondayBasedStartDay }, (_, i) => {
			const day = new Date(rangeStart);
			day.setDate(day.getDate() - mondayBasedStartDay + i);
			return day;
		});
	}, [rangeStart]);

	const paddingDaysAfter = useMemo(() => {
		const endDay = rangeEnd.getDay();
		const mondayBasedEndDay = endDay === 0 ? 6 : endDay - 1;
		return Array.from({ length: 6 - mondayBasedEndDay }, (_, i) => {
			const day = new Date(rangeEnd);
			day.setDate(day.getDate() + i + 1);
			return day;
		});
	}, [rangeEnd]);

	const allDays = useMemo(
		() => [...paddingDaysBefore, ...monthDays, ...paddingDaysAfter],
		[paddingDaysBefore, monthDays, paddingDaysAfter],
	);

	const handlePrevious = () => {
		setRangeStart((prev) => startOfMonth(subMonths(prev, 1)));
		setRangeEnd((prev) => endOfMonth(subMonths(prev, 1)));
	};

	const handleNext = () => {
		setRangeStart((prev) => startOfMonth(addMonths(prev, 1)));
		setRangeEnd((prev) => endOfMonth(addMonths(prev, 1)));
	};

	const events = useAppState(createSelectEventsForRange(rangeStart, rangeEnd));

	const getEventsForDay = (day: Date) => {
		return events.filter((event) => {
			return isSameDay(event.date, day);
		});
	};

	return (
		<Paper variant="outlined" sx={{ overflow: "hidden" }}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					p: 1,
				}}
			>
				<IconButton onClick={handlePrevious}>
					<ArrowLeftIcon />
				</IconButton>
				<Typography fontWeight="bold">
					{format(rangeStart, "MMMM do")} - {format(rangeEnd, "MMMM do yyyy")}
				</Typography>
				<IconButton onClick={handleNext}>
					<ArrowRightIcon />
				</IconButton>
			</Box>
			<Box bgcolor="divider">
				<Grid container spacing="1px" height="100%" pt="1px" columns={7}>
					{daysOfWeek.map((day) => (
						<Grid key={day} size={1} py={0.5} bgcolor="background.default">
							<Typography
								variant="body2"
								color="text.secondary"
								fontWeight="bold"
								textAlign="center"
							>
								{day}
							</Typography>
						</Grid>
					))}
					{allDays.map((date) => {
						const eventsForDay = getEventsForDay(date);
						return (
							<CalendarDay
								key={date.toISOString()}
								day={date}
								events={eventsForDay}
								disabled={!isSameMonth(date, rangeStart)}
							/>
						);
					})}
				</Grid>
			</Box>
		</Paper>
	);
};
