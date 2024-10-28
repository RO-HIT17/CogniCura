export enum Role {
    PATIENT = 'patient',
    DOCTOR = 'doctor',
}

export enum Specialization {
    GENERAL = 'general',
    ENT = 'ent',
    CARDIOLOGY = 'cardiology',
    NEUROLOGY = 'neurology',
    ORTHOPEDICS = 'orthopedics',
    PEDIATRICS = 'pediatrics',
    OTHER = 'other',
}

export enum Reason {
    NEW_CONSULTATION = 'new_consultation',
    FOLLOW_UP = 'follow_up',
    TEST_RESULTS = 'test_results',
}


export enum AppointmentMode {
    IN_PERSON = 'in_person',
    ONLINE = 'online',
}

export enum Location {
    CHENNAI = 'chennai',
    MUMBAI = 'mumbai',
    DELHI = 'delhi',
    BANGALORE = 'bangalore',
}

export enum Status {
    SCHEDULED = 'scheduled',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
}
