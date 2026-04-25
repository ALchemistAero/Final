import bcrypt from "bcrypt";
import prisma from "./client.js";

async function main() {
  const adminPasswordHash = await bcrypt.hash("Admin123!", 10);
  const userPasswordHash = await bcrypt.hash("User123!", 10);

  await prisma.comment.deleteMany();
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      name: "Regular User",
      email: "user@example.com",
      passwordHash: userPasswordHash,
      role: "USER",
    },
  });

  const adminProject = await prisma.project.create({
    data: {
      name: "Admin Project",
      description: "Sample project owned by the admin user.",
      status: "ACTIVE",
      userId: admin.id,
    },
  });

  const userProject = await prisma.project.create({
    data: {
      name: "User Project",
      description: "Sample project owned by the regular user.",
      status: "PLANNED",
      userId: regularUser.id,
    },
  });

  const adminTask = await prisma.task.create({
    data: {
      title: "Admin Task",
      description: "A sample admin-owned task.",
      status: "TODO",
      dueDate: new Date("2026-05-15T12:00:00.000Z"),
      projectId: adminProject.id,
      userId: admin.id,
    },
  });

  const userTask = await prisma.task.create({
    data: {
      title: "User Task",
      description: "A sample regular-user-owned task.",
      status: "IN_PROGRESS",
      dueDate: new Date("2026-05-20T12:00:00.000Z"),
      projectId: userProject.id,
      userId: regularUser.id,
    },
  });

  await prisma.comment.createMany({
    data: [
      {
        body: "Admin sample comment.",
        taskId: adminTask.id,
        userId: admin.id,
      },
      {
        body: "Regular user sample comment.",
        taskId: userTask.id,
        userId: regularUser.id,
      },
    ],
  });

  console.log("Seed completed successfully.");
  console.log("Admin login: admin@example.com / Admin123!");
  console.log("User login: user@example.com / User123!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
