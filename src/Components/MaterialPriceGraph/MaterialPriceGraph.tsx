import { MaterialPriceHistory } from "../../Types/types";
import { Box, Typography } from "@mui/material";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { dateToString } from "../../system/utils";

interface PriceData {
  date: string;
  price: number;
  rateLine?: number;
}

export default function MaterialPriceGraph({ priceHistory }: { priceHistory: MaterialPriceHistory }) {
  const history = priceHistory?.priceHistory || [];
  if (history.length === 0) {
    return <Typography>No price history available.</Typography>;
  }

  const chartData: PriceData[] = history.map(item => ({
    date: item.date ? (dateToString(item.date) as string) : "",
    price: item.price ?? 0,
  }));

  if (chartData.length > 0) {
    // Compute the average price over all data points
    const average = Math.round((chartData.reduce((sum, d) => sum + d.price, 0) / chartData.length) * 100) / 100;
    // Set each data point's rateLine to the average price (i.e. horizontal average line)
    chartData.forEach(d => {
      d.rateLine = average;
    });
  }

  // Use a fixed color for the average line (e.g., orange)
  const averageLineColor = "orange";

  return (
    <Box sx={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
          formatter={(value, name) => {
            // Customize the displayed label for each dataKey
            let newLabel = name;
            if (name === "price") {
              newLabel = "Цена";
            } else if (name === "rateLine") {
              newLabel = "Средна цена";
            }
            value = value + " лв.";
            return [value, newLabel];
          }}/>
          <Line type="monotone" dataKey="price" stroke="#1976d2" strokeWidth={2} dot={{ r: 3 }} animationDuration={200}/>
          {chartData[0]?.rateLine !== undefined && (
            <Line
              type="monotone"
              dataKey="rateLine"
              stroke={averageLineColor}
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
              animationDuration={200}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
