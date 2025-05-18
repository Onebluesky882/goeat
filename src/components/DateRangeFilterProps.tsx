import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface DateRangeFilterProps {
  range: DateRange;
  setRange: (r: DateRange) => void;
}

interface DateRange {
  from?: Date;
  to?: Date;
}

interface DateRangeFilterProps {
  range: DateRange;
  setRange: (r: DateRange) => void;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  range,
  setRange,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "min-w-[220px] justify-start text-left font-medium",
            !(range.from && range.to) && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-5 w-5" />
          {range.from && range.to ? (
            `${format(range.from, "PPP")} → ${format(range.to, "PPP")}`
          ) : (
            <span>Select date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {/* <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          initialFocus
          numberOfMonths={2}
          className={cn("p-3 pointer-events-auto")}
        /> */}
      </PopoverContent>
    </Popover>
  );
};
