import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import { Card, CardContent, Typography } from "@mui/material";
import { Shift, Time } from "../../entities/types";

function getRandomColor(str: string) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var color = "#";
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    color += ('' + value.toString(16)).substring(-2);
  }
  return color;
}

interface ShiftCardProps {
  shift: Shift;
}

const ShiftCard = ({ shift }: ShiftCardProps): JSX.Element => {
  return (
    <Card sx={{ mt: 1, borderLeft:6, borderColor:getRandomColor(shift.owner) }}>
      <CardContent sx={{p:0.25, '&:last-child': { p: 0.25 } }}>
        <Typography sx={{ display:"flex", justifyContent:"center"}}>
          {Time.toString(shift.start)} - {Time.toString(shift.end)} 
        </Typography>
        <Typography sx={{ fontWeight: "bold", display:"flex", justifyContent:"center"}}>
          {shift.owner}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ShiftCard;
