import { OverlayTrigger, Tooltip } from "react-bootstrap";

export const Card = ({ children }) => {
    return (
      <div className="border rounded-lg shadow-md p-4 max-w-[350px] h-auto">
        {children}
      </div>
    );
  };
  
  export const CardHeader = ({ children }) => {
    return (
      <div className="border-b pb-2 mb-4">
        {children}
      </div>
    );
  };
  
  export const CardTitle = ({ children }) => {
    return (
        <OverlayTrigger overlay={<Tooltip id={children}>{children}</Tooltip>}>
            <h3 className="text-xl font-[600] truncate">{children}</h3>
        </OverlayTrigger>
      
    );
  };
  
  export const CardContent = ({ children }) => {
    return (
      <div className="mb-3">
        {children}
      </div>
    );
  };
  
  export const CardFooter = ({ children }) => {
    return (
      <div className="pt-3 border-t d-flex justify-content-center">
        {children}
      </div>
    );
  };