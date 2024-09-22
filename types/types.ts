export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface Organization {
    id: string;
    name: string;
    ownerId: string;
}

export interface OrganizationMember {
    userId: string;
    organizationId: string;
    role: 'owner' | 'admin' | 'member';
}