// src/hooks/mutations/update/useUpdateBook.ts
import { useMutation } from "@tanstack/react-query";
import { updateBook, UpdateBookPayload } from "@/api/update/updateBook";

export const useUpdateBook = () => {
    return useMutation({
        mutationFn: (payload: UpdateBookPayload) => updateBook(payload),
    });
};
