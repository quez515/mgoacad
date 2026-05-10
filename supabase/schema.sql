create type public.app_role as enum ('admin', 'client', 'prospect');
create type public.pipeline_stage as enum ('New Lead', 'Qualified', 'Audit Complete', 'Discovery Call', 'Proposal Sent', 'Client Active', 'Retainer');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  role app_role not null default 'prospect',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  business_name text not null,
  industry text,
  monthly_revenue text,
  owner_email text,
  status text not null default 'Active',
  created_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete set null,
  profile_id uuid references public.profiles(id) on delete set null,
  name text not null,
  email text not null,
  business_name text not null,
  industry text not null,
  monthly_revenue text,
  status pipeline_stage not null default 'New Lead',
  intake_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audits (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  title text not null,
  status text not null default 'Draft',
  diagnostic_report jsonb not null default '[]'::jsonb,
  recommendations jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.value_scores (
  id uuid primary key default gen_random_uuid(),
  audit_id uuid not null references public.audits(id) on delete cascade,
  overall_score integer not null check (overall_score between 0 and 100),
  dream_outcome_score integer not null,
  perceived_likelihood_score integer not null,
  time_delay_score integer not null,
  effort_sacrifice_score integer not null,
  weaknesses text[] not null default '{}',
  recommendations text[] not null default '{}',
  pricing_power text not null,
  created_at timestamptz not null default now()
);

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  audit_id uuid references public.audits(id) on delete cascade,
  name text not null,
  positioning text not null,
  offer_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.bundles (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid references public.offers(id) on delete cascade,
  name text not null,
  stated_value numeric,
  recommended_price numeric,
  value_ratio numeric,
  bundle_payload jsonb not null default '{}'::jsonb
);

create table public.pricing_models (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid references public.offers(id) on delete cascade,
  tier_name text not null,
  price_range text not null,
  deliverables jsonb not null default '[]'::jsonb,
  positioning text,
  customer_type text,
  effort_level text,
  delivery_method text,
  margin_indicator text
);

create table public.objections (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid references public.offers(id) on delete cascade,
  objection text not null,
  psychological_concern text not null,
  solution text not null,
  guarantee text,
  proof_mechanism text,
  alternative_offer_structure text
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  audit_id uuid references public.audits(id) on delete cascade,
  title text not null,
  status text not null default 'Draft',
  report_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  event_type text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.leads enable row level security;
alter table public.audits enable row level security;
alter table public.value_scores enable row level security;
alter table public.offers enable row level security;
alter table public.bundles enable row level security;
alter table public.pricing_models enable row level security;
alter table public.objections enable row level security;
alter table public.reports enable row level security;
alter table public.notes enable row level security;
alter table public.activity_logs enable row level security;

create or replace function public.current_role() returns app_role language sql stable as $$
  select coalesce((select role from public.profiles where id = auth.uid()), 'prospect'::app_role)
$$;

create policy "admins manage profiles" on public.profiles for all using (public.current_role() = 'admin') with check (public.current_role() = 'admin');
create policy "users view own profile" on public.profiles for select using (id = auth.uid());
create policy "prospects can submit leads" on public.leads for insert with check (true);
create policy "admins manage leads" on public.leads for all using (public.current_role() = 'admin') with check (public.current_role() = 'admin');
create policy "clients view own leads" on public.leads for select using (profile_id = auth.uid() or client_id in (select id from public.clients where profile_id = auth.uid()));

create policy "admins manage clients" on public.clients for all using (public.current_role() = 'admin') with check (public.current_role() = 'admin');
create policy "clients view own client" on public.clients for select using (profile_id = auth.uid());

create policy "admins manage audits" on public.audits for all using (public.current_role() = 'admin') with check (public.current_role() = 'admin');
create policy "clients view own audits" on public.audits for select using (client_id in (select id from public.clients where profile_id = auth.uid()));
create policy "service inserts audits" on public.audits for insert with check (true);

create policy "admins manage value scores" on public.value_scores for all using (public.current_role() = 'admin') with check (public.current_role() = 'admin');
create policy "clients view value scores" on public.value_scores for select using (audit_id in (select id from public.audits where client_id in (select id from public.clients where profile_id = auth.uid())));
create policy "service inserts value scores" on public.value_scores for insert with check (true);

create policy "admins manage offers" on public.offers for all using (public.current_role() = 'admin') with check (public.current_role() = 'admin');
create policy "clients view offers" on public.offers for select using (audit_id in (select id from public.audits where client_id in (select id from public.clients where profile_id = auth.uid())));
create policy "service inserts offers" on public.offers for insert with check (true);
