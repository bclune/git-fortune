#! /usr/bin/env python
# Convert a fortunes file into a git repository, with a commit message
# corresponding to each fortune.

import os, sys

if __name__ == "__main__":
    assert (len(sys.argv) > 1), "Usage: fortunes.py FILENAME [REPOSITORY]"
    filename = sys.argv[1]
    repo = sys.argv[2] if len(sys.argv) > 2 else '.'
    os.chdir(repo)
    fortune = ''
    with open(filename) as file:
        for line in file:
            if not line.startswith('%'):
                fortune += line
            else:
                os.system('git commit --allow-empty -m "%s"'%fortune.strip())
                print fortune.strip()
                fortune = ''

