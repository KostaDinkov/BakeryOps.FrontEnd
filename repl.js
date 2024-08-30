const allPermissions = ['users.read', 'users.write', 'users.delete', 'users.update', 'products.read', 'products.write', 'products.delete', 'products.update', 'orders.read', 'orders.write', 'orders.delete', 'orders.update', 'categories.read', 'categories.write', 'categories.delete', 'categories.update', 'roles.read', 'roles.write', 'roles.delete', 'roles.update', 'permissions.read', 'permissions.write', 'permissions.delete', 'permissions.update'];


let checkedPermissions = ['users.read', false, false, false, 'products.read']

let finalPermissions = allPermissions.filter(permission => checkedPermissions.includes(permission));
console.log(finalPermissions);

allPermissions.forEach((permission,i) => {
    if(finalPermissions.includes(permission)){
        checkedPermissions[i] = permission;
    }
    else{
        checkedPermissions[i] = false;
    }
});

console.log(checkedPermissions);