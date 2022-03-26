using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Xu : MonoBehaviour
{
    public Text tongxu;
    GameObject Mario;

    private void Awake()
    {
        Mario = GameObject.FindGameObjectWithTag("Player");
    }

    // Start is called before the first frame update
    void Start()
    {
        tongxu.text = "" + Mario.GetComponent<MarioScript>().soxu;

    }

    //Update is called once per frame
    void Update()
    {
        if (gameObject.tag == "Xu")
        {
            transform.Rotate(new Vector3(0, 1f, 0) * 180f * Time.deltaTime);
        }
    }

    void FixedUpdate()
    {
        tongxu.text = "" + Mario.GetComponent<MarioScript>().soxu;
    }
}
