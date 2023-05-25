const Roles = ["Admin", "Base"] as const;

type Role = keyof typeof Roles;

export default Role;
