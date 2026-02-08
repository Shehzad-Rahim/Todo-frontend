"use client";

import type { Task } from "@/types/task";

interface CategoryCardsProps {
  tasks: Task[];
}

// Category definitions with icons and colors
const categories = [
  {
    name: "Project",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
      </svg>
    ),
    colorClass: "card-category-blue",
    iconColor: "text-blue-500",
  },
  {
    name: "Work",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
    colorClass: "card-category-mint",
    iconColor: "text-emerald-500",
  },
  {
    name: "Daily Tasks",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    colorClass: "card-category-purple",
    iconColor: "text-violet-500",
  },
  {
    name: "Groceries",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
    colorClass: "card-category-peach",
    iconColor: "text-orange-500",
  },
];

export function CategoryCards({ tasks }: CategoryCardsProps) {
  // Count tasks per category (for now, distribute evenly as placeholder)
  const totalTasks = tasks.length;
  const tasksPerCategory = Math.ceil(totalTasks / 4);

  return (
    <div className="grid grid-cols-2 gap-3 mb-8">
      {categories.map((category, index) => {
        // Simple distribution for demo - in real app, tasks would have categories
        const count = index === 0 ? totalTasks : 0;

        return (
          <div
            key={category.name}
            className={`${category.colorClass} rounded-2xl p-4 cursor-pointer hover:shadow-soft transition-all duration-200`}
          >
            <div className={`${category.iconColor} mb-3`}>
              {category.icon}
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">
              {category.name}
            </h3>
            <p className="text-sm text-gray-500">
              {count} {count === 1 ? "task" : "tasks"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
