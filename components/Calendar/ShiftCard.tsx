import { Card, CardContent, Typography } from "@mui/material";
import { Shift, Time } from "../../entities/types";

interface ShiftCardProps {
  shift: Shift;
}

const ShiftCard = ({ shift }: ShiftCardProps): JSX.Element => {
  return (
    <Card sx={{ mt: ".50rem" }}>
      <CardContent>
        <Typography>
          {Time.toString(shift.start)} - {Time.toString(shift.end)}
        </Typography>
        <Typography sx={{ fontWeight: "bold" }}>{shift.owner}</Typography>
      </CardContent>
    </Card>
  );
};

export default ShiftCard;
