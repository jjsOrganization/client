import { Button } from "antd";


export const BlueButton = ({ children, ...props }) => {
    <Button >
        {children}
    </Button>
}

export const TailWindButton = ({ className,children, ...props }) => {
    return(
        <button className={className} {...props}>
            {children}
         </button>
    )
}