import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrgById } from "@/services/orgservice/orgservice";
import { FaRegFilePdf } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import ChatInput from "../Chat/ChatInput";
import { ChatQuestion } from "@/services/chatService/chatservice";

function Orgs() {
  const { id } = useParams();
  const [org, setOrg]: any = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatHistory, setChatHistory]: any = useState([]);
  const [input, setInput] = useState("");

  const fetchOrg = async () => {
    try {
      const response = await getOrgById(id);
      setOrg(response);
      setChatHistory(response.chat_history);

    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrg();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    if (input !== "") {
      const payload = { question: `${input}` };
      e.preventDefault();
      try {
        const response = await ChatQuestion(org.org_id, payload);
        setChatHistory([...chatHistory, { type: 'question', text: input }, { type: 'answer', text: response.answer }]);
        console.log(response.answer);
      } catch {
        alert("something went wrong");
      }
      setInput("");
    }
  };
  return (
    <div className="flex flex-col justify-around items-center  h-screen p-4 bg-darkBackground">
      {org ? (
        <div className="bg-darkBackground rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center items-center mb-4">
            {typeof org.data === "string" ? (
              <FaRegFilePdf className="text-red-500 text-6xl" />
            ) : (
              <SiMicrosoftexcel className="text-green-500 text-6xl" />
            )}
          </div>
          <h1 className="text-2xl font-bold mb-4">{org.org_id}</h1>
        </div>
      ) : (
        <div>Organization not found</div>
      )}{
        chatHistory &&
          <div className="w-full max-w-3xl bg-darkBackground rounded-lg shadow-lg p-4 mb-4 custom-scrollbar overflow-y-auto" style={{ maxHeight: '50vh' }}>
        {chatHistory.map((message: any, index: any) => (
            <div key={index} className={`p-2 my-2 rounded-lg ${message.type === 'question' ? 'bg-darkBackground text-textColor' : 'bg-darkBackground text-white'}`}>
            {message.text}
          </div>
        ))}
      </div>
    }
      <ChatInput
        input={input}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />{" "}
      {/* Add the ChatInput component below */}
    </div>
  );
}

export default Orgs;
