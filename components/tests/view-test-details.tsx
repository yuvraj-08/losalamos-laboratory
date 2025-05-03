"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { TestWithCategory } from "./tests-list";

interface ViewTestDetailsProps {
  test: TestWithCategory | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewTestDetails({
  test,
  open,
  onOpenChange,
}: ViewTestDetailsProps) {
  if (!test) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Test Details</DialogTitle>
        </DialogHeader>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 pb-4 border-b">
                <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium">{test.name}</h3>
                </div>
              </div>

              <div className="space-y-3">
                {test.description && (
                  <div>
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="mt-1">{test.description}</p>
                  </div>
                )}

                {test.duration && (
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="mt-1">{test.duration}</p>
                  </div>
                )}

                {test.cost && (
                  <div>
                    <p className="text-sm text-muted-foreground">Cost</p>
                    <p className="mt-1">${test.cost}</p>
                  </div>
                )}

                {test.ideal_range && (
                  <div>
                    <p className="text-sm text-muted-foreground">Ideal Range</p>
                    <p className="mt-1">{test.ideal_range}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
