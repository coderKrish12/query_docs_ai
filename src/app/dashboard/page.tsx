"use client";

//React Imports
import React, { useState } from "react";

// Next Imports
import Image from "next/image";

// UI Imports
import {
  Button,
  IconButton,
  InputAdornment,
  Typography,
  useTheme,
} from "@mui/material";

// UI Component Imports
import SelectDropdown from "@/components/FormComponents/SelectDropdown";
import FormInput from "@/components/FormComponents/FormInput";

// Third party Imports
import dayjs from "dayjs";

// Icon Imports
import { LuSendHorizonal } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

const DUMMY_CHATS = [
  {
    created_at: Date.now(),
    chats: ["chat 1", "chat 2", "chat 3", "chat 4"],
  },
  {
    created_at: Date.now(),
    chats: ["chat 1", "chat 2", "chat 3", "chat 4"],
  },
  {
    created_at: Date.now(),
    chats: ["chat 1", "chat 2", "chat 3", "chat 4"],
  },
  {
    created_at: Date.now(),
    chats: ["chat 1", "chat 2", "chat 3", "chat 4"],
  },
];

function Dashboard() {
  const theme = useTheme();
  const [files, setFiles] = useState<File[]>([]);
  const preventDefaultHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleFileRemove = (file: File) => {
    const updatedFiles = files.filter((item) => item.name !== file.name);
    setFiles(updatedFiles);
  };
  return (
    <div id="chat-container" className="max-h-svh h-svh w-full p-4 flex">
      <div
        id="chat-left-content"
        className="w-2/12 flex flex-col items-center justify-center"
        style={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Button
          variant="outlined"
          className="capitalize font-semibold p-2 w-5/6 mt-4"
        >
          <FaPlus className="mx-2" /> New Chat
        </Button>
        <div
          id="query-chats"
          className="overflow-y-auto max-h-[90svh] p-6 w-full"
        >
          {DUMMY_CHATS.map((chat, i) => {
            return (
              <div key={i} className="p-2 flex flex-col text-start">
                <Typography className="text-[10px] italic">
                  {dayjs(chat.created_at).format("MMM DD, YYYY")}
                </Typography>
                {chat.chats.map((queryChat, i) => {
                  return (
                    <Typography key={i} className="py-2">
                      {queryChat}
                    </Typography>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div
        id="chat-right-content"
        className="w-10/12 h-full p-8 flex flex-col justify-between"
        style={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        <div className="flex items-center w-full my-4 flex-none">
          <Typography className="text-sm text-end pr-2">
            Select files
          </Typography>
          <SelectDropdown
            options={files}
            placeholder="Max. 3 files"
            disbled={files.length === 0}
            className="min-w-[200px] md:w-2/6"
          />
          {files.length > 0 && (
            <Typography
              className="text-sm text-end pl-2 font-semibold"
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              View files
            </Typography>
          )}
        </div>
        <div className="w-full p-4 flex flex-col items-center justify-center flex-1 shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.3)] rounded-lg m-2">
          <div
            className="w-2/6"
            onDragOver={(e) => {
              preventDefaultHandler(e);
            }}
            onDragEnter={(e) => {
              preventDefaultHandler(e);
            }}
            onDragLeave={(e) => {
              preventDefaultHandler(e);
            }}
            onDrop={(e) => {
              preventDefaultHandler(e);
              const filesList = Array.from(e.dataTransfer.files);
              setFiles(filesList);
            }}
          >
            {files.length > 0 ? (
              <div className="flex flex-col p-8 items-center justify-center">
                {files.map((item, i) => {
                  return (
                    <div
                      className="flex items-center justify-between w-full"
                      key={i}
                    >
                      <Typography>{item.name}</Typography>
                      <IconButton
                        className="mx-2"
                        onClick={() => handleFileRemove(item)}
                      >
                        <MdCancel className="text-red-500" />
                      </IconButton>
                    </div>
                  );
                })}
              </div>
            ) : (
              <label
                className="flex justify-center w-full p-8 transition border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                style={{
                  backgroundColor: theme.palette.background.default,
                }}
              >
                <span className="flex flex-col items-center space-x-2">
                  <Image
                    src="/images/FileUploadDocument.png"
                    height={40}
                    width={40}
                    className="my-4"
                    alt="File upload"
                  />
                  <Typography
                    className="font-semibold"
                    sx={{
                      color: theme.palette.primary.main,
                    }}
                  >
                    Drag & Drop or click to upload
                  </Typography>
                  <Typography>or</Typography>
                  <Typography>Select Files from the above listings</Typography>
                </span>
                <input type="file" name="file_upload" className="hidden" />
              </label>
            )}
          </div>
          <Button variant="contained" className="capitalize w-2/6 my-4 p-3">
            Upload Documents
          </Button>
        </div>
        <FormInput
          optional={true}
          className="flex-none mt-6"
          placeholder="Type your message..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LuSendHorizonal className="text-2xl text-[#aaa]" />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
