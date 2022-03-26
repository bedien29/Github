using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class MenuGame : MonoBehaviour
{

    private void Awake()
    {
        
    }

    public void StartGame(){
        SceneManager.LoadScene("Scene1");
    }

    public void QuitGame(){
        Application.Quit();
    }

    public void RestartGame()
    {
        SceneManager.LoadScene("Scene1");
    }

    public void ToMenu()
    {
        SceneManager.LoadScene("MenuGame");
    }
}
