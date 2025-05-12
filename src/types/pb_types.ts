/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	Assignees = "assignees",
	Events = "events",
	MemberPreferences = "member_preferences",
	Members = "members",
	Organisations = "organisations",
	Roles = "roles",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export type AssigneesRecord = {
	created?: IsoDateString
	event_id?: RecordIdString
	id: string
	member_id?: RecordIdString
	org_id?: RecordIdString
	owner_id?: RecordIdString
	role_id?: RecordIdString
	updated?: IsoDateString
}

export type EventsRecord = {
	created?: IsoDateString
	date: IsoDateString
	description?: string
	id: string
	org_id: RecordIdString
	owner_id: RecordIdString
	required_role_ids: RecordIdString[]
	title: string
	updated?: IsoDateString
}

export type MemberPreferencesRecord = {
	avoided_roles?: RecordIdString[]
	created?: IsoDateString
	id: string
	max_per_month?: number
	member_id?: RecordIdString
	min_gap_days?: number
	org_id?: RecordIdString
	owner_id?: RecordIdString
	preferred_roles?: RecordIdString[]
	updated?: IsoDateString
}

export type MembersRecord = {
	active?: boolean
	created?: IsoDateString
	id: string
	name?: string
	org_id: RecordIdString
	owner_id: RecordIdString
	permission_level?: number
	updated?: IsoDateString
	user_id?: RecordIdString
}

export type OrganisationsRecord = {
	created?: IsoDateString
	id: string
	name?: string
	owner_id: RecordIdString
	updated?: IsoDateString
}

export type RolesRecord = {
	created?: IsoDateString
	description?: string
	icon?: string
	id: string
	maxAssignments?: number
	minAssignments?: number
	name: string
	org_id?: RecordIdString
	owner_id?: RecordIdString
	updated?: IsoDateString
}

export type UsersRecord = {
	avatar?: string
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	name?: string
	org_ids?: RecordIdString[]
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type AssigneesResponse<Texpand = unknown> = Required<AssigneesRecord> & BaseSystemFields<Texpand>
export type EventsResponse<Texpand = unknown> = Required<EventsRecord> & BaseSystemFields<Texpand>
export type MemberPreferencesResponse<Texpand = unknown> = Required<MemberPreferencesRecord> & BaseSystemFields<Texpand>
export type MembersResponse<Texpand = unknown> = Required<MembersRecord> & BaseSystemFields<Texpand>
export type OrganisationsResponse<Texpand = unknown> = Required<OrganisationsRecord> & BaseSystemFields<Texpand>
export type RolesResponse<Texpand = unknown> = Required<RolesRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	assignees: AssigneesRecord
	events: EventsRecord
	member_preferences: MemberPreferencesRecord
	members: MembersRecord
	organisations: OrganisationsRecord
	roles: RolesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	assignees: AssigneesResponse
	events: EventsResponse
	member_preferences: MemberPreferencesResponse
	members: MembersResponse
	organisations: OrganisationsResponse
	roles: RolesResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'assignees'): RecordService<AssigneesResponse>
	collection(idOrName: 'events'): RecordService<EventsResponse>
	collection(idOrName: 'member_preferences'): RecordService<MemberPreferencesResponse>
	collection(idOrName: 'members'): RecordService<MembersResponse>
	collection(idOrName: 'organisations'): RecordService<OrganisationsResponse>
	collection(idOrName: 'roles'): RecordService<RolesResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
