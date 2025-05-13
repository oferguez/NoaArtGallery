@echo off
setlocal enabledelayedexpansion

cd public\gallery

set count=1
for %%f in (*.jpeg) do (
    ren "%%f" "work!count!.jpeg"
    set /a count+=1
)

echo Done renaming .jpeg files to work#.jpeg
pause
