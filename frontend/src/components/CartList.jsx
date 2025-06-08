import { OverlayTrigger, Tooltip } from "react-bootstrap";
export const CartProduct = ({ children }) => {
    return (
      <div className="border rounded-lg shadow-md p-4 max-w-[350px] h-auto">
        {children}
      </div>
    );
  };
  
  export const CartProductImg = ({ children, className }) => {
    return (
      <div className={`border-b pb-2 mb-4 ${className}`}>
        {children}
      </div>
    );
  };
  
  export const CartProductTitle = ({ children }) => {
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