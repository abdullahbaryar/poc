import { newEnforcer, Model, StringAdapter } from "casbin";

// 1. Model Definition
const modelConf = `
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
`;

// 2. Policy Definition
const policyConf = `
p, admin, dashboard, read
p, admin, issuance, read
p, admin, kyt, read
p, admin, topology, read

p, user, dashboard, read
p, user, wallet, read

p, merchant, dashboard, read
p, merchant, settlement, read

p, regulator, dashboard, read
p, regulator, por, read
p, regulator, topology, read
`;

export const getCasbinEnforcer = async () => {
  // ✅ FIX: StringAdapter use karein taaki file system ki zaroorat na pade
  const adapter = new StringAdapter(policyConf);

  const model = new Model();
  // ✅ FIX: loadModelFromText use karein
  model.loadModelFromText(modelConf);

  const enforcer = await newEnforcer(model, adapter);
  return enforcer;
};
