# hackerrank-cert-solutions

Parent/index repository for HackerRank certification challenge repositories.

Challenge code should live in separate Git repositories and be linked here as
submodules using this layout:

```text
<topic>/<difficulty>/<module-number>
```

Examples:

```text
node/basic/1
node/basic/2
node/intermediate/1
python/basic/1
```

Each leaf directory is a separate submodule. For example, `node/basic/1` and
`node/basic/2` are separate repositories under the same topic/difficulty.

## Clone

Clone everything at once:

```sh
git clone --recurse-submodules <parent-repo-url>
```

If the repository is already cloned:

```sh
git submodule update --init --recursive
```

## Add a Module

Use the helper so the path is consistent and existing paths are not overwritten:

```sh
./scripts/add-submodule.sh node basic 3 <repo-url>
```

This runs:

```sh
git submodule add <repo-url> node/basic/3
```

Then commit the parent repo changes:

```sh
git add .gitmodules node/basic/3
git commit -m "Add node basic module 3"
```

## Update a Module

Update one module to a newer commit:

```sh
cd node/basic/1
git pull
cd ../../..
git add node/basic/1
git commit -m "Update node basic module 1"
```

Update all initialized modules:

```sh
git submodule update --remote --recursive
git status --short
git add <changed-submodule-path>...
git commit -m "Update submodules"
```

## Remove a Module

Remove the submodule from the parent repo:

```sh
git submodule deinit -f node/basic/1
git rm -f node/basic/1
rm -rf .git/modules/node/basic/1
git commit -m "Remove node basic module 1"
```

## Existing Modules

The current `node` modules with local remotes are configured in `.gitmodules`:

```text
node/basic/1
node/basic/2
node/intermediate/1
node/intermediate/2
```

For challenge folders that do not yet have external repositories, create the
external repo first, then add it here with:

```sh
./scripts/add-submodule.sh <topic> <difficulty> <module-number> <repo-url>
```
