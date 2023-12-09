import { ReactNode } from "react";

export default function Layout({
  children,
  all,
  analytics,
  mailing,
}: {
  children: React.ReactNode;
  all: React.ReactNode;
  analytics: React.ReactNode;
  mailing: React.ReactNode;
}) {
  //console.log("children=!!!!!!!!!!!!!!!!!",children);
  return <div>{children}</div>;
}
