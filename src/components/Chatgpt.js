import React, { useEffect, useState } from 'react';
import styles from '../styles/Chatbot.module.css'; // Updated import

function ScienceChatbot({query}) {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: 'Hello! I am your Exam Revision Assistant. How can I help you today?',
        },
    ]);

    const [userInput, setUserInput] = useState('');

    const handleSendMessage = () => {
        if (userInput.trim()) {
            // Add user's message to the chat
            const newUserMessage = {
                id: messages.length + 1,
                sender: 'user',
                text: userInput,
            };
            setMessages((prev) => [...prev, newUserMessage]);

            // Simulate bot response (you can replace this with an actual API call)
            const botResponse = {
                id: messages.length + 2,
                sender: 'bot',
                text: `You said: "${userInput}". Could you elaborate?`,
            };
            setMessages((prev) => [...prev, botResponse]);

            // Clear input field
            setUserInput('');
        }
    };

    useEffect(() => {
        if (query === 1){

            let newMessage = {
                id: messages.length + 1,
                sender: 'user',
                text: 'Explain what is the conservation of energy.',
            }

            setMessages((prev) => [...prev, newMessage])
            
            let newResponse = {
                id: messages.length + 1,
                sender: 'bot',
                text: 'The conservation of energy is a fundamental principle in physics stating that energy cannot be created or destroyed, only transformed from one form to another or transferred between objects. The total amount of energy in an isolated system remains constant over time.',
            }

            setMessages((prev) => [...prev, newResponse])
        }
        else if (query === 2){
            let newMessage = {
                id: messages.length + 1,
                sender: 'user',
                text: 'Explain why is the answer 100 joules.',
            }
    
            setMessages((prev) => [...prev, newMessage])
            
            let newResponse = {
                id: messages.length + 1,
                sender: 'bot',
                text: 'The total energy at point B is 100 J because of the Principle of Conservation of Energy, which states that in a closed system with no external forces like friction or air resistance, the total energy remains constant.',
            }
    
            setMessages((prev) => [...prev, newResponse])
        }
    }, [query])

    return (
        <div className={styles.chatbotContainer}>
            <div className={styles.chatHeader}>
                <h4>quizDaddyBot</h4>
                <p>Ask anything!</p>
            </div>

            <div className={styles.chatWindow}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`${styles.chatMessage} ${msg.sender === 'bot' ? styles.botMessage : styles.userMessage}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            <div className={styles.chatInput}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} // Send on Enter key press
                    className={styles.chatInputField}
                />
                <button onClick={handleSendMessage} className={styles.sendButton}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default ScienceChatbot;
