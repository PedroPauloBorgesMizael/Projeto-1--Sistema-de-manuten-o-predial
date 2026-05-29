export interface UpdateStatusDTO {
    ticketId: string;
    status: "NEW" | "IN_PROGRESS" | "PENDING" | "CLOSED";
}
