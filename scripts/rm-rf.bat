:: slient command
@echo off

:: move to parent folder
cd ..

:: del all files and folders in build folder
del /q "build\*"
FOR /D %%p IN ("build\*.*") DO rmdir "%%p" /s /q

:: del build folder self
rmdir /q "build"

:: echo command
@echo on