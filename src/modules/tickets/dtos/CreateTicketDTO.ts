export interface CreateTicketDTO {
    title: string;
    description: string;
    category: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    location: string;
    requesterId: string;
}