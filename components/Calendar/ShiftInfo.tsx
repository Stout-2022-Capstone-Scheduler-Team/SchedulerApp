import { Paper, Grid, Card, CardContent, Typography } from "@mui/material";
import { Shift, Time } from "../../entities/types";

interface ShiftCardProps {
  shift: Shift;
}

const ShiftCard = (props: ShiftCardProps): JSX.Element => {
  return (
    <Card>
      <CardContent>
        <Typography>Start - End</Typography>
        <Typography>Employee Name</Typography>
      </CardContent>
    </Card>
  );
};

export default ShiftCard;
