import React from "react";
import { PageHeader } from "antd";

export default function Header() {
  return (
    <a href="/" rel="noopener noreferrer">
      <PageHeader
        title="🎺 Ad Trumpet"
        subTitle="Ad community"
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}
