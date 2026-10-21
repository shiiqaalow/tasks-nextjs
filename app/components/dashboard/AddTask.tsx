// AddTask.tsx (the dialog)
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddTaskForm from "./AddTaskForm";

type AddTaskProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const AddTask = ({ open, onOpenChange }: AddTaskProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add new task</DialogTitle>
        <DialogDescription>
          Give your task a title and pick a status.
        </DialogDescription>
      </DialogHeader>
      <AddTaskForm onDone={() => onOpenChange(false)} />
    </DialogContent>
  </Dialog>
);

export default AddTask;