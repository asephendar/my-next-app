export const metadata = {
  title: "Tasks",
};

const TasksLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" data-theme="cupcake">
      <body>{children}</body>
    </html>
  )
};

export default TasksLayout;
