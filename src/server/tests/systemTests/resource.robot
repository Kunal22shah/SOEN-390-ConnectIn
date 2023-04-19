*** Settings ***
Documentation    This resource file is to be
...    used in test files that share
...    the same functions
Library    SeleniumLibrary

*** Keywords ***
Launch Browser
    [Documentation]    Launches MS Edge and opens the sign in page.
    Open Browser    http://localhost:3000/signin    Chrome
    Sleep    3s
    Maximize Browser Window

Check Pending Connections
    [Documentation]    Checks the pending connections
    ...                of the user.
    Click Element    xpath:(//html/body/div/div[1]/header/div/div[3]/button[2])
    Wait Until Page Contains    Pending connections requests

Sign Up
    [Documentation]    Create an account of the application.
    ...                Works with any type of user.
    [Arguments]    ${fname}    ${lastname}    ${email}    ${pwd}    ${USER_TYPE}
    Click Element    xpath:(//*/a)
    Input Text      xpath:(//*[@id="root"]/div/div[2]/div[1]/form/label[1]/input)    ${FNAME}
    Input Text      xpath:(//*[@id="root"]/div/div[2]/div[1]/form/label[2]/input)    ${lastname}
    Input Text      xpath:(//*[@id="root"]/div/div[2]/div[1]/form/label[3]/input)    ${email}
    Input Password      xpath:(//*[@id="root"]/div/div[2]/div[1]/form/label[4]/input)    ${pwd}
    Click Element    id:select
    IF    "${USER_TYPE}" == "User"
        Wait Until Element Is Visible    xpath:(//*/ul/li[1])
        Click Element    xpath:(//*/ul/li[1])
    ELSE IF    "${USER_TYPE}" == "Recruiter"
        Wait Until Element Is Visible    xpath:(//*/ul/li[2])
        Click Element    xpath:(//*/ul/li[2])
    ELSE IF    ${USER_TYPE} == "Administrator"
        Wait Until Element Is Visible    xpath:(//*/ul/li[3])
        Click Element    xpath:(//*/ul/li[3])
    ELSE
        Fail    "Invalid User Type"
    END
    Click Button    xpath:(//*[@id="root"]/div/div[2]/div[1]/form/button)
    Wait Until Page Contains Element    class:swal-modal
    Wait Until Element Contains    class:swal-text    Successfully created an account!
    Sleep    3s

Login to ConnectIn
    [Documentation]    Signs in as a user of the application.
    ...                Works with any type of user.
    [Arguments]    ${USER}    ${PWD}
    # Title Should Be    ConnectIn - Log In
    Input Text      xpath:(//*[@id="root"]/div/div[2]/div/form/div/input[1])    ${USER}
    Input Text      xpath:(//*[@id="root"]/div/div[2]/div/form/div/input[2])  ${PWD}
    Click Button    xpath:(//*[@id="root"]/div/div[2]/div/form/button)
    Sleep    5s


Search for Users
    [Documentation]    Searches for a specific user of the application.
    ...                If no argument is passed through, all users will
    ...                be searched.
    [Arguments]    ${user}=nothing
    Page Should Contain Element    xpath:(//*[@id="root"]/div/div[1]/header/div/div[2]/p/button)
    IF    "${user}" != "nothing"
        Input Text    xpath:(//*[@id="root"]/div/div[1]/header/div/div[2]/p/input)    ${user}
    END
    Click Element    xpath:(//*[@id="root"]/div/div[1]/header/div/div[2]/p/button)
    Sleep    2s
    Page Should Contain Element    class:singleUser

Search and add Users
    [Documentation]    Searches for 2 users named andrew. 
    ...                If both are present, sends both of them connection requests.
    [Arguments]    ${user}=adrew
    Search for Users    ${user}
    Click Button    xpath:(//*[@id="root"]/div[2]/div/div[1]/div[2]/button)
    Wait Until Page Contains Element    class:swal-modal
    Wait Until Element Contains    class:swal-text    You have successfully sent connection request!
    Sleep    3s
    Click Button    xpath:(//*[@id="root"]/div[2]/div/div[2]/div[2]/button)
    Wait Until Page Contains Element    class:swal-modal
    Wait Until Element Contains    class:swal-text    You are already connected
    Sleep    3s

Adding new connection
    [Documentation]    Adds waiting connection to connections list.
    Click Button    xpath:(//*[@id="root"]/div/div[1]/header/div/div[3]/button[2])
    Click Button    xpath:(//*[@id="root"]/div[2]/div/div/div/div/table/tr/td[3]/button[1])
    Wait Until Page Contains Element    class:swal-modal
    Wait Until Element Contains    class:swal-text    Updated waiting connections!
    Sleep    3s

Rejecting a new connection
    [Documentation]    Rejects a user from waiting connections.
    Click Button    xpath:(//*[@id="root"]/div/div[1]/header/div/div[3]/button[2])
    Click Button    xpath:(//*[@id="root"]/div[2]/div/div/div/div/table/tr/td[3]/button[2])
    Wait Until Page Contains Element    class:swal-modal
    Wait Until Element Contains    class:swal-text    Updated waiting connections!
    Sleep    3s

Removing a connection
    [Documentation]    Removes a connection
    Click Button    xpath:(//*[@id="root"]/div/div[2]/div[3]/div/l1/div/span/button)
    Click Button    xpath:(/html/body/div[2]/div/div[4]/div[2]/button)
    Wait Until Page Contains Element    class:swal-modal
    Sleep    3s
 
Sign Out
    [Documentation]    Signs out from the application.
    [Arguments]    ${USER_TYPE}
    Click Button    xpath:(//*/header/div/div[3]/button[1])
    IF    "${USER_TYPE}" == "User"
        Click Element   xpath:(//*[@id="root"]/div/div[1]/header/div/div[3]/button[7])
    ELSE IF    "${USER_TYPE}" == "Recruiter"
        Click Element   xpath:(//*[@id="root"]/div/div[1]/header/div/div[3]/button[10])
    ELSE IF    "${USER_TYPE}" == "Administrator"
        Click Element    xpath:(//*[@id="root"]/div/div[1]/header/div/div[3]/button[11])
    ELSE
        Fail    "Invalid User Type"
    END
    Sleep    3s
    
Sign Out & Close
    [Documentation]    Signs out from the application and closes browser.
    [Arguments]    ${USER_TYPE}
    Sign Out    ${USER_TYPE}
    Close Browser

Create A Post
    [Arguments]    ${post_message}
    [Documentation]    Creates a post on the timeline page.
    Click Element    xpath:(/html/body/div/div[1]/header/div/div[3]/button[1])
    Page Should Contain Textfield    xpath:(//*[@id="outlined-basic"])
    Input Text    xpath:(//*[@id="outlined-basic"])    ${post_message}
    Click Element    xpath:(//*[@id="root"]/div/div[2]/div[2]/div[2]/button)
    Wait Until Page Contains Element    class:swal-modal
    Sleep    3s
    Page Should Contain    ${post_message}

Report a DM
    [Documentation]    Create a DM report of the first 
    ...                message sent by the receiving user.
    Page Should Contain Element    xpath:(//html/body/div/div[2]/div/div[2]/div[2]/div[5]/div/button)
    Mouse Over    xpath:(//html/body/div/div[2]/div/div[2]/div[2]/div[5]/div/button)
    Click Element    xpath:(//html/body/div/div[2]/div/div[2]/div[2]/div[5]/div/button)
    Wait Until Page Contains    Chat Report
    Click Element    xpath:(//html/body/div[4]/div[3]/div/div/div)
    Wait Until Element Is Visible    xpath:(//*/ul/li[1])
    Click Element    xpath:(//*/ul/li[1])
    Click Button    xpath:(//html/body/div[4]/div[3]/button)
    Wait Until Page Contains Element    class:swal-modal
    Sleep    3s

Message A User
    [Documentation]    Messages the first user in the contacts list.
    [Arguments]    ${message}
    Page Should Contain Element    xpath:(//*/div/div[3]/button[5])
    Click Button    xpath:(//*/div/div[3]/button[5])
    Sleep    3s
    Click Element    xpath:(//*[@id="root"]/div[2]/div/div[1]/div/div[2]/div)
    Page Should Contain Element    xpath:(//*/form/input)
    Input Text    xpath:(//*/form/input)    ${message}
    Click Button    xpath:(//*/form/button)
    Sleep    2s
    Page Should Contain    ${message}