import { Link, useNavigate } from "react-router";
import { ReactNode } from "react";
import { Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function index({
  children,
  title,
  hasBackButton,
  links,
}: {
  children: ReactNode;
  title: string;
  hasBackButton?: boolean;
  links: { to: string; text: string; icon: ReactNode }[];
}) {
  const navigate = useNavigate();

  return (
    <nav className="flex flex-col justify-center gap-3">
      <div className="flex items-center justify-between gap-2">
        {hasBackButton && (
          <Button
            variant="outlined"
            onClick={() => navigate("..")}
            startIcon={<ArrowBackIcon />}
          />
        )}
        <Typography fontSize={"1.5rem"} component="h2">
          {title}
        </Typography>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {links.map((link, index) => (
          <Button
            key={index}
            sx={{ justifyContent: "start" }}
            variant="outlined"
            color="primary"
            startIcon={link.icon }
            component={Link}
            to={link.to}
          >
            {link.text}
          </Button>
        ))}
      </div>
    </nav>
  );
}
