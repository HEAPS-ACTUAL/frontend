import React from "react";
import styles from "../../styles/RevisionSchedule.module.css";

const EventForm = ({
  isEditing,
  eventData,
  setEventData,
  handleFormSubmit,
  handleEventDelete,
  setIsEditing,
}) => {
  return (
    <form onSubmit={handleFormSubmit} className={styles.eventForm}>
      <h3>{isEditing ? "Edit Event" : "Add Event"}</h3>
      <label>
        Date:
        <input
          type="date"
          value={eventData.date}
          onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
          required
        />
      </label>
      <label>
        Title:
        <input
          type="text"
          value={eventData.title}
          onChange={(e) =>
            setEventData({ ...eventData, title: e.target.value })
          }
          required
        />
      </label>
      <label>
        Description:
        <textarea
          value={eventData.description}
          onChange={(e) =>
            setEventData({ ...eventData, description: e.target.value })
          }
        />
      </label>
      <label>
        Color:
        <input
          type="color"
          value={eventData.color}
          onChange={(e) =>
            setEventData({ ...eventData, color: e.target.value })
          }
        />
      </label>
      <div className={styles.formButtons}>
        <button type="submit" className={styles.saveButton}>
          {isEditing ? "Save Changes" : "Add Event"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => handleEventDelete(eventData.date)}
            className={styles.deleteButton}
          >
            Delete
          </button>
        )}
        <button
          type="button"
          onClick={() =>
            setEventData({
              date: "",
              title: "",
              description: "",
              color: "#f39c12",
            })
          }
          className={styles.cancelButton}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EventForm;
