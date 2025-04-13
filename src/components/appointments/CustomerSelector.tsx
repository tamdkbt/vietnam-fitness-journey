
import React, { useState, useEffect } from "react";
import { Check, ChevronDown, Search, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Customer } from "@/types/customer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCustomers } from "@/hooks/useCustomers";

interface CustomerSelectorProps {
  selectedCustomer: Customer | null;
  onCustomerSelect: (customer: Customer) => void;
}

const CustomerSelector: React.FC<CustomerSelectorProps> = ({
  selectedCustomer,
  onCustomerSelect,
}) => {
  const [open, setOpen] = useState(false);
  const { customers, loading } = useCustomers();
  
  // Get customer initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Map goal ID to human-readable text
  const getGoalText = (goalId: string) => {
    switch(goalId) {
      case "weight-loss": return "Giảm cân";
      case "muscle-gain": return "Tăng cơ";
      case "general-health": return "Sức khỏe chung";
      case "athletic-performance": return "Nâng cao thể lực";
      default: return goalId;
    }
  };
  
  const getAvatarColor = (name: string) => {
    // Simple hash function to generate consistent colors based on name
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500", "bg-orange-500", "bg-teal-500"];
    return colors[hash % colors.length];
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedCustomer ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className={cn("text-xs", getAvatarColor(selectedCustomer.name))}>
                  {getInitials(selectedCustomer.name)}
                </AvatarFallback>
              </Avatar>
              <span>{selectedCustomer.name}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <User className="mr-1 h-4 w-4" />
              <span>Chọn khách hàng</span>
            </div>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[300px]">
        <Command>
          <CommandInput placeholder="Tìm kiếm khách hàng..." className="h-9" />
          <CommandList>
            <CommandEmpty>Không tìm thấy khách hàng</CommandEmpty>
            <CommandGroup heading="Danh sách khách hàng">
              {loading ? (
                <CommandItem disabled>
                  <span className="text-sm">Đang tải...</span>
                </CommandItem>
              ) : (
                customers.map(customer => (
                  <CommandItem
                    key={customer.id}
                    value={customer.id}
                    onSelect={() => {
                      onCustomerSelect(customer);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={cn("text-xs", getAvatarColor(customer.name))}>
                          {getInitials(customer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col flex-1">
                        <span className="font-medium">{customer.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {customer.age} tuổi | {getGoalText(customer.goal)}
                        </span>
                      </div>
                      {selectedCustomer?.id === customer.id && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CustomerSelector;
