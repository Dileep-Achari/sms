// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import './sms.css';  // Include custom CSS file

// const App = () =>
// {
//   const [smsMessages, setSmsMessages] = useState([]);
//   const [whatsappMessages, setWhatsappMessages] = useState([]);
//   const [showSmsMessages, setShowSmsMessages] = useState(false);
//   const [showWhatsappMessages, setShowWhatsappMessages] = useState(false);

//   useEffect(() =>
//   {
//     const fetchData = async () =>
//     {
//       try
//       {
//         const response = await axios.post(
//           "https://apk.doctor9.com/meeYdya/api/getGridViewDetails",
//           {
//             FROM_DT: "1-Aug-2024",
//             TO_DT: "23-Oct-2024",
//             PAGENUM: "1",
//             PAGE_SIZE: "1000",
//             IP_SESSION_ID: 28,
//             UMR_NO: "MRR0001049"
//           },
//           {
//             headers: {
//               "x-auth-token":
//                 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJIT1NUIjoiTVJSQ0hVQVQiLCJVTVJfTk8iOiJNUlIwMDAxMDQ5IiwiT1JHX0lEIjoxLCJMT0NfSUQiOjEsIk1PQklMRV9OTyI6bnVsbCwiaWF0IjoxNzI4OTAxNDQzfQ.fbcrAZUWgTNhT5H5kKCDYuVBebxOypde4i45M4-AUI0",
//               "umrno": "MRR0001049"
//             }
//           }
//         );

//         const smsData = response.data.data.SMS.map(sms => sms.MOB_MSG_TPL);
//         const whatsappData = response.data.data.WHATSAPP.map(wa => wa.payload.waTemp);

//         setSmsMessages(smsData);
//         setWhatsappMessages(whatsappData);
//       } catch (error)
//       {
//         console.error("Error fetching data", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const toggleSmsMessages = () =>
//   {
//     setShowSmsMessages(!showSmsMessages);
//     setShowWhatsappMessages(false);
//   };

//   const toggleWhatsappMessages = () =>
//   {
//     setShowWhatsappMessages(!showWhatsappMessages);
//     setShowSmsMessages(false);
//   };

//   return (
//     <div className="app-container">
//       <h1>Message Templates</h1>
//       <div className="button-container">
//         <button className="custom-button sms-button" onClick={toggleSmsMessages}>
//           SMS ({smsMessages.length})
//         </button>
//         <button className="custom-button whatsapp-button" onClick={toggleWhatsappMessages}>
//           WhatsApp ({whatsappMessages.length})
//         </button>
//       </div>

//       {/* SMS Messages List */}
//       {showSmsMessages && (
//         <div className="message-list">
//           <h2>SMS Messages</h2>
//           <ul>
//             {smsMessages.map((message, index) => (
//               <li key={index}>{message}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* WhatsApp Messages List */}
//       {showWhatsappMessages && (
//         <div className="message-list">
//           <h2>WhatsApp Messages</h2>
//           <ul>
//             {whatsappMessages.map((message, index) => (
//               <li key={index}>{message}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;


import React, { useEffect, useState } from "react";
import axios from "axios";
import './sms.css';  // Ensure you're importing the correct CSS file

const SmsPage = () => {
  const [smsMessages, setSmsMessages] = useState([]);
  const [whatsappMessages, setWhatsappMessages] = useState([]);
  const [showSmsMessages, setShowSmsMessages] = useState(false);
  const [showWhatsappMessages, setShowWhatsappMessages] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        console.log("token", token)
        // If no token exists, don't make the request
        if (!token) {
          console.error("No auth token found.");
          return;
        }

        const response = await axios.post(
          "https://apk.doctor9.com/meeYdya/api/getGridViewDetails",
          {
            FROM_DT: "1-Aug-2024",
            TO_DT: "23-Oct-2024",
            PAGENUM: "1",
            PAGE_SIZE: "1000",
            IP_SESSION_ID: 28,
            UMR_NO: "MRR0001049"
          },
          {
            headers: {
              "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJIT1NUIjoiTVJSQ0hVQVQiLCJVTVJfTk8iOiJNUlIwMDAxMDQ5IiwiT1JHX0lEIjoxLCJMT0NfSUQiOjEsIk1PQklMRV9OTyI6bnVsbCwiaWF0IjoxNzI4OTAxNDQzfQ.fbcrAZUWgTNhT5H5kKCDYuVBebxOypde4i45M4-AUI0",  // Use the token from localStorage
              "umrno": "MRR0001049"
            }
          }
        );
        console.log("response", response)
        const smsData = response.data.data.SMS.map(sms => sms.MOB_MSG_TPL);
        const whatsappData = response.data.data.WHATSAPP.map(wa => wa.payload.waTemp);

        setSmsMessages(smsData);
        setWhatsappMessages(whatsappData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const toggleSmsMessages = () => {
    setShowSmsMessages(!showSmsMessages);
    setShowWhatsappMessages(false);
  };

  const toggleWhatsappMessages = () => {
    setShowWhatsappMessages(!showWhatsappMessages);
    setShowSmsMessages(false);
  };

  return (
    <div className="app-container">
      <h1>Message Templates</h1>
      <div className="button-container">
        <button className="custom-button sms-button" onClick={toggleSmsMessages}>
          SMS ({smsMessages.length})
        </button>
        <button className="custom-button whatsapp-button" onClick={toggleWhatsappMessages}>
          WhatsApp ({whatsappMessages.length})
        </button>
      </div>

      {showSmsMessages && (
        <div className="message-list">
          <h2>SMS Messages</h2>
          <ul>
            {smsMessages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      {showWhatsappMessages && (
        <div className="message-list">
          <h2>WhatsApp Messages</h2>
          <ul>
            {whatsappMessages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SmsPage;

