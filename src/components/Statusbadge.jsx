import React from "react";
import { STATUS_META, getDisplayStatus } from "../slices/helper";

export default function StatusBadge({ invoice }) {
  const key = getDisplayStatus(invoice);
  const { label, color } = STATUS_META[key] || STATUS_META.DRAFT;
  return <span className={`badge ${color}`}>{label}</span>;
}
