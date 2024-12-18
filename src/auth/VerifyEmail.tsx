import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";

const VerifyEmail = () => {
  const loading = false;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  // Handle input changes
  const handleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }

    // Move to the next input field if a digit/character is entered
    if (value !== "" && index < otp.length - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] !== "") {
        // Clear the current input
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move focus to the previous input field
        inputRef.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-gray-200">
        {/* Title and Description */}
        <div className="text-center">
          <h1 className="font-extrabold text-2xl">Verify your email</h1>
          <p className="text-sm text-gray-600">
            Enter the 6 digit code sent to your email address
          </p>
        </div>

        {/* OTP Input Form */}
        <form>
          <div className="flex justify-between">
            {otp.map((letter: string, idx: number) => (
              <Input
                key={idx}
                ref={(element) => (inputRef.current[idx] = element)}
                maxLength={1}
                type="text"
                value={letter}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(idx, e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(idx, e)
                }
                className="md:w-12 md:h-12 w-10 h-10 text-center text-xl font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>

          {/* Verify Button */}
          {loading ? (
            <Button
              disabled
              className="bg-orange hover:bg-hoverOrange mt-6 w-full"
            >
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-orange hover:bg-hoverOrange mt-6 w-full"
            >
              Verify
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
