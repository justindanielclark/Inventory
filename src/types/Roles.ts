const Roles = ["Admin", "Base"] as const;

type Role = (typeof Roles)[number];

export default Role;
