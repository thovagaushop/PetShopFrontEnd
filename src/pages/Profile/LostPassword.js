import { Snackbar } from "@mui/base";
import { useState } from "react";
import instance from "../../api/axios";
import { Alert } from "@mui/material";

export default function LostPassword() {
  const [message, setMessage] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    type: null,
    content: "",
  });

  const [email, setEmail] = useState("");

  const handleCloseSnack = () => {
    setMessage({ ...message, open: false });
  };
  const handleSubmit = async (e) => {
    try {
      const { data } = await instance.post(`/auth/forgot-password`, { email });
      setMessage({
        ...message,
        open: true,
        type: "success",
        content: data.message,
      });
    } catch (error) {
      setMessage({
        ...message,
        open: true,
        type: "error",
        content: error.response.data.message,
      });
    }
  };
  return (
    <div className="px-[100px] flex justify-center">
      <Snackbar
        anchorOrigin={{
          vertical: message.vertical,
          horizontal: message.horizontal,
        }}
        open={message.open}
        onClose={handleCloseSnack}
        message="I love snacks"
        key={message.vertical + message.horizontal}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={message.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message.content}
        </Alert>
      </Snackbar>
      <div className="mt-[100px] w-[40%] h-[100px] border-2 border-[var(--hover-color)] flex flex-col justify-around items-center rounded-[30px]">
        <div className="bg-[var(--grey-border)] outline-none text-[var(--hover-color)] font-bold mt-1 focus:outline-none focus:border-[var(--hover-color)] focus:ring-0">
          Email
        </div>
        <div className="flex w-[80%] h-[30%] justify-around">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-[80%] text-[14px]"
            type="email"
            placeholder="Confirm your email"
            required
          />
          <button
            className="bg-[var(--violet-color)] px-[10px] py-[5px] text-white rounded-[50px] hover:bg-[var(--hover-color)]"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
