import { cn } from "clsx-tailwind-merge";

interface Props {
    passStrength: number,
    style?: string,
}

const PasswordStrength = ({ passStrength, style }: Props) => {
    console.log(passStrength);
    
    return (
        <div className={`flex mt-1 ml-2 border border-slate-600 rounded-lg max-w-48 gap-[1px]`}>           
            {
                Array.from({
                    length: passStrength + 1
                }).map((i, index) => (
                    <div key={index}
                        className={cn("h-2 w-full rounded-sm border border-l-white", {
                            "bg-red-500": passStrength === 0,
                            "bg-orange-500": passStrength === 1,
                            "bg-yellow-500": passStrength === 2,
                            "bg-green-500": passStrength === 3,
                        }
                    )}></div>
                ))
            }
            {
                Array.from({
                    length: 4 - (passStrength +1)
                }).map((i, index) => (
                    <div key={index}
                        className={cn("h-2 w-full rounded-xl",
                    )}></div>
                ))
            }
        </div>
    )
}
export default PasswordStrength