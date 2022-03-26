using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PhaBoGioiHan : MonoBehaviour
{
    GameObject Mario;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void Awake()
    {
        Mario = GameObject.FindGameObjectWithTag("Player");
    }

    void FixedUpdate()
    {
        if(transform.position.x - Mario.GetComponent<MarioScript>().transform.position.x <= 10)
        {
            Destroy(gameObject);
        }
    }


}
