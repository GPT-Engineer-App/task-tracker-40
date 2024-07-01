import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Trash2, Edit3, CheckSquare } from "lucide-react";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (id, text) => {
    setEditTaskId(id);
    setEditTaskText(text);
  };

  const saveTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: editTaskText } : task)));
    setEditTaskId(null);
    setEditTaskText("");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Todo App</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
              className="flex-grow"
            />
            <Button onClick={addTask}>Add</Button>
          </div>
          <Separator />
          <ScrollArea className="h-64">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between py-2">
                {editTaskId === task.id ? (
                  <Input
                    value={editTaskText}
                    onChange={(e) => setEditTaskText(e.target.value)}
                    className="flex-grow"
                  />
                ) : (
                  <span>{task.text}</span>
                )}
                <div className="flex space-x-2">
                  {editTaskId === task.id ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button variant="outline" onClick={() => saveTask(task.id)}>
                            <CheckSquare className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Save</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button variant="outline" onClick={() => startEditing(task.id, task.text)}>
                            <Edit3 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button variant="outline" onClick={() => deleteTask(task.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          You have {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;