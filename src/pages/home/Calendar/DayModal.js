import React, { useEffect, useState } from "react";
import styles from "../../../styles/DayModal.module.css";
import { FaTrashCan } from "react-icons/fa6";
import postItIcon from "../../../images/post-it.png";
import FlashcardModal from "./FlashcardModal"; // Ensure this is the correct import path

function DayModal({ date, events, handleDeleteClicked, fetchTestsForEvent }) {
  const [formattedDate, setFormattedDate] = useState("");
  const [isFlashcardModalOpen, setFlashcardModalOpen] = useState(false);
  const [selectedTests, setSelectedTests] = useState([]);

  useEffect(() => {
    const formatted = new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setFormattedDate(formatted);
  }, [date]);

  // Handler for when an event is clicked to show tests
  const handleEventClick = async (event) => {
    console.log("Event clicked:", event); // Debug: Check the clicked event
    const tests = await fetchTestsForEvent(event.id); // Fetch tests for this event
    setSelectedTests(tests);
    setFlashcardModalOpen(true);
  };

  return (
    <div className={styles.modalContainer}>
      <img alt="Post-it" className={styles.postItIcon} src={postItIcon} />
      <FlashcardModal
        isOpen={isFlashcardModalOpen}
        tests={selectedTests}
        onClose={() => setFlashcardModalOpen(false)}
      />
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>Today's Events</div>
        <div className={styles.modalDate}>
          <div>{formattedDate}</div>
        </div>
        <div
          className={`${styles.eventsContainer} ${
            events.length === 0 ? styles.noEvents : ""
          }`}
        >
          {events.length === 0 ? (
            <p className={styles.noEventsMessage}>-No Events Today-</p>
          ) : (
            events.map((event) => (
              <div key={event.id} className={styles.eventItem}>
                <button
                  className={styles.eventTitle}
                  onClick={() => handleEventClick(event)}
                >
                  {event.title}
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteClicked(event)}
                >
                  <FaTrashCan style={{ opacity: 0.5 }} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DayModal;
