import { cn } from "clsx-tailwind-merge";

interface Props {
    passStrength: number,
    style?: string,
}

const PasswordStrength = ({ passStrength, style }: Props) => {
    console.log(passStrength);
    
    return (
        <div className={`flex mt-1 ml-2`}>
            
            {
                Array.from({
                    length: passStrength + 1
                }).map((i, index) => (
                    <div key={index}
                        className={cn("h-2 w-full rounded-sm max-w-7", {
                            "bg-red-500": passStrength === 0,
                            "bg-orange-500": passStrength === 1,
                            "bg-yellow-500": passStrength === 2,
                            "bg-green-500": passStrength === 3,
                        }
                    )}></div>
                ))
            }
        </div>
    )
}
export default PasswordStrength