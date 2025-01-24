// src/components/UpcomingEvents.jsx
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useEvents from "../hooks/useEvents";

const apiUrl = "http://localhost:3000/event"; // API base URL

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
}));

const UpcomingEvents = () => {
  const { events, loading, error, deleteEvent } = useEvents(apiUrl); // Use custom hook
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDelete = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(eventId);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const upcomingEvents = events.filter((event) => new Date(event.startDate) > new Date());

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Upcoming Events
      </Typography>
      {upcomingEvents.length === 0 ? (
        <Typography>No upcoming events found.</Typography>
      ) : (
        upcomingEvents.map((event) => (
          <StyledCard key={event.id}>
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: red[500] }}>{event.name.charAt(0)}</Avatar>}
              title={event.name}
              subheader={`Starts: ${formatDate(event.startDate)}`}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {event.description}
              </Typography>
              <Typography variant="body2">
                <strong>Venue:</strong> {event.venue}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton onClick={() => setSelectedEvent(event)} aria-label="edit event">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(event.id)} aria-label="delete event">
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            </CardActions>
          </StyledCard>
        ))
      )}
    </div>
  );
};

export default UpcomingEvents;
