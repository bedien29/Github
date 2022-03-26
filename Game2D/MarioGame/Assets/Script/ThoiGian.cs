using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class ThoiGian : MonoBehaviour
{
    public float timeleft;
    public Text thoigian;
    // Start is called before the first frame update
    void Start()
    {
        timeleft = 150;
        thoigian.text = timeleft.ToString("F1");
    }

    // Update is called once per frame
    void Update()
    {
        timeleft = timeleft - Time.deltaTime;
        thoigian.text = timeleft.ToString("F1");
        if (timeleft <= 0)
        {
            SceneManager.LoadScene("GameOver");
        }
    }
}
